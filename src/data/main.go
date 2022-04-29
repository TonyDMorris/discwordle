package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"regexp"
	"strings"
)

type Quote struct {
	Quote string `json:"quote"`
	Book  string `json:"book"`
}
type Bundle struct {
	QuotesByBook map[string][]Quote `json:"quotes"`
	Books        []string           `json:"books"`
	Images       map[string]string  `json:"images"`
}

func main() {
	bytes, err := os.ReadFile("./pqf")
	if err != nil {
		panic(err)
	}
	quotes := strings.Split(string(bytes), "<--split-->")

	bundle := Bundle{
		QuotesByBook: make(map[string][]Quote),
		Books:        make([]string, 0),
		Images:       make(map[string]string),
	}
	for _, quote := range quotes {
		trimmedQuote := strings.TrimSpace(quote)
		if len(trimmedQuote) > 0 {
			if trimmedQuote[len(trimmedQuote)-1:] != ")" {
				panic(trimmedQuote)
			}
			lastIndex := strings.LastIndex(trimmedQuote, ",")
			title := trimmedQuote[lastIndex+2 : len(trimmedQuote)-1]
			lastIndexQuote := strings.LastIndex(trimmedQuote, "-- (")
			if lastIndexQuote == -1 {
				lastIndexQuote = strings.LastIndex(trimmedQuote, "(T")
			}
			trimmedQuote = trimmedQuote[:lastIndexQuote]
			bundle.QuotesByBook[title] = append(bundle.QuotesByBook[title], Quote{
				Quote: trimmedQuote,
				Book:  title,
			})
			bundle.Books = appendIfNotExists(bundle.Books, title)
		}
	}

	for _, quotes := range bundle.QuotesByBook {
		if len(quotes) < 3 {
			bundle.Books = removeStringFromSlice(bundle.Books, quotes[0].Book)
		}
		sortByLength(quotes)
	}
	for _, book := range bundle.Books {
		title := regexp.MustCompile(`[^\w,\s]`).ReplaceAllString(book, "")
		title = strings.ToLower(strings.Replace(title, " ", "-", -1))
		url := fmt.Sprintf("https://www.lspace.org/ftp/images/bookcovers/uk/%s-%v.jpg", title, 2)
		resp, err := http.Get(url)
		if err != nil {
			panic(err)
		}
		if resp.StatusCode != 200 {
			url = fmt.Sprintf("https://www.lspace.org/ftp/images/bookcovers/uk/%s-%v.jpg", title, 1)
			resp, err = http.Get(url)
			if err != nil {
				panic(err)
			}
			if resp.StatusCode != 200 {
				panic(fmt.Sprintf("%s: %d", title, resp.StatusCode))
			}
		}
		bundle.Images[book] = url

	}

	bytes, err = json.Marshal(bundle)
	if err != nil {
		panic(err)
	}
	err = os.WriteFile("./quotes.json", bytes, 0644)
}

func appendIfNotExists(slice []string, s string) []string {
	for _, ele := range slice {
		if ele == s {
			return slice
		}
	}
	return append(slice, s)
}
func removeStringFromSlice(slice []string, s string) []string {
	for i, ele := range slice {
		if ele == s {
			return append(slice[:i], slice[i+1:]...)
		}
	}
	return slice
}

func sortByLength(slice []Quote) {
	for i := 0; i < len(slice); i++ {
		for j := i + 1; j < len(slice); j++ {
			if len(slice[i].Quote) > len(slice[j].Quote) {
				slice[i], slice[j] = slice[j], slice[i]
			}
		}
	}
}
