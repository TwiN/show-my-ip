# show-my-ip
Add-on link (Firefox): https://addons.mozilla.org/en-US/firefox/addon/show-ip/

Add-on link (Chrome): https://chrome.google.com/webstore/detail/show-my-ip/njjhkglmjpklhkfchpjdjjnfjjmeghho

- Main API: https://twin.sh/api/v1/ip
- FALLBACK API: http://ip-api.com/line?fields=query


## Build
```
web-ext build
```


## Notes
Special thanks to http://ip-api.com for letting me use their API as a fallback in case the main API goes down.
