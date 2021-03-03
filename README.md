<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.sorpetaler.de/hubert/">
    <img alt="Gatsby" src="https://www.sorpetaler.de/wp-content/themes/hubert/dist/images/HUBERT_logo_desktop.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Hubert website documentation
</h1>

A documentation for the <a href="https://www.sorpetaler.de/">Sorpetaler</a> Hubert website.

## 🚀 Permalink

### Page types

In this website we have four types of pages:

- dynamic pages that are created dynamically using gatsby-node file `[slug].js`
- static pages designated by there names
- static pages that need arguments and that may act as a single-page app `(name).js`
- index pages that will take he directory name when accessing from the web

## Developement rules

- Add a prefix to branch names (prefix should be issue number) `e.g: feature/225-refactoring-about-page`
- Set branch prefix to commits `e.g: 225-fix-key-warnings`
- Reorder and separate imports. First, importing node_modules, set new line then import local files from far to near, e.g:

```
 import React from 'react';
 import moment from 'moment';
 import Logo from '../../assets'; --> farthest file
 import constants from '../utils';
 import Home from './pages/Home'; --> nearest file
```

- Combine components exports in index file.
- Write a description for new issues and PRs in github.
- Keep PR name the same as the branch name.

## Hosting and deployment

### Hosting

We use Netlify for hosting because it's free and integrate a native CDN.
Netlify embrace the serverless concept so this help a lot in reducing cost and making the website performant.
Netlify have a DNS server so this make integration with external host name easier.
They also provide a ssl certification for free.

### Deployment

Netlify come with it's build pipeline, you need just to give it access to the github repository.
Every push to a specified branch will trigger the build pipeline, `dev` branch in our case.
For every pull request there's also a a separate link to preview you work.

### Contentful

We host the data in a contentful to get the best of headless cms and the JAMStack architecture.
For every data update the build pipeline is triggered by a Netlify hook.
For proper and secure build integration the Contentful credentials are added to Netlify via environement variables.

<!-- AUTO-GENERATED-CONTENT:END -->
