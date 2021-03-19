<p align="center">
  <a href="https://www.sorpetaler.de/hubert/">
    <img alt="Gatsby" src="https://www.sorpetaler.de/wp-content/themes/hubert/dist/images/HUBERT_logo_desktop.svg"  />
  </a>
</p>
<h1 align="center">
  Project documentation
</h1>

A documentation for the <a href="https://www.sorpetaler.de/hubert">Sorpetaler</a> Hubert website.

## Permalink

### Website tree

```
.
├── index.js
├── about.js
├── blog.js
│   ├── index.js
│   └── [slug].js
├── category.js
│   ├── index.js
│   └── [slug].js
└── author.js
    ├── index.js
    └── [slug].js

```

### Page types

In this website we have four types of pages:

- static pages designated by there names
- index pages that will take he directory name when accessing from the web
- dynamic pages that are created dynamically using gatsby-node file [slug].js

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

## Stack and technology

## Stack :

- Contentful :  
  Content infrastructure and a headless CMS, that lets you create, manage and distribute content to any platform. Unlike a CMS, it gives you total freedom to create your own content model so you can decide which content you want to manage.

- Jamstack :  
  An architecture designed to make the web faster, more secure, and easier to scale. It builds on many of the tools and workflows which developers love, and which bring maximum productivity.
  The core principles of pre-rendering, and decoupling, enable sites and applications to be delivered with greater confidence and resilience than ever before.

- Gatsby cloud :  
  A unified cloud platform specifically built for the Gatsby framework that combines a modern developer toolset and workflow with an optimized, global edge network for an unbeatable Gatsby experience.

- Netlify :  
  One of the most amazing web development platform which is meant to multiply your productivity in the best possible way. The platform helps developers to build, test, and deploy websites. By unifying the modern decoupled web elements from local development processes to advanced logics, Netlify is offering an amazingly faster way to ensure much more performant, scalable, and secure websites and applications.

- Netlify-function :  
  Lets you deploy serverless Lambda functions without an AWS account, and with function management handled directly within Netlify. Your serverless functions are version-controlled, built, and deployed along with the rest of your Netlify site, and we will automatically handle service discovery through our built-in API gateway. This eliminates overhead and brings the power of Deploy Previews and rollbacks to your serverless functions.

## Technology :

- GraphQl:  
  A query language for APIs and a runtime for fulfilling those queries with an existing data. GraphQL provides a complete and understandable description of the data in APIs, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

- Styled-component:  
  One of the new ways to use CSS in modern JavaScript. It is the meant to be a successor of CSS Modules, a way to write CSS that's scoped to a single component, and not leak to any other element in the page.

- Gatsby-Image :  
  A plugin that automatically creates React components for optimized images that: Loads the optimal size of image for each device size and screen ...
