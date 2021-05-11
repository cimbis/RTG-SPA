import initStoryshots from '@storybook/addon-storyshots';
import { axeTest, imageSnapshot } from '@storybook/addon-storyshots-puppeteer';


describe('axe A11Y Storyshots [LIGHT]', () => {
    initStoryshots({
        suite: 'A11Y',
        test: axeTest({
            storybookUrl: 'http://localhost:6006/',
            customizePage: (page) => {
                page.emulateMediaFeatures([{
                    name: 'prefers-color-scheme',
                    value: 'light'
                }])
            }
        }),
    });
})

describe('axe A11Y Storyshots [DARK]', () => {
    initStoryshots({
        suite: 'A11Y',
        test: axeTest({
            storybookUrl: 'http://localhost:6006/',
            customizePage: (page) => {
                page.emulateMediaFeatures([{
                    name: 'prefers-color-scheme',
                    value: 'dark'
                }])
            }
        }),
    });
})


describe('Image Snapshots [LIGHT]', () => {
    initStoryshots({
        suite: 'Image Snapshots',
        test: imageSnapshot({
            customizePage: (page) => {
                page.emulateMediaFeatures([{
                    name: 'prefers-color-scheme',
                    value: 'light'
                }])
            },
            beforeScreenshot: async (page) => {
                await page.waitForSelector('.page-element');
                await page.$$eval(
                    'img',
                    images => {
                        images.forEach(img => {
                            img.removeAttribute('src');
                            img.setAttribute('src', 'https://via.placeholder.com/100');
                        })
                    }
                );
            }
        })
    });
})

describe('Image Snapshots [DARK]', () => {
    initStoryshots({
        suite: 'Image Snapshots',
        test: imageSnapshot({
            customizePage: (page) => {
                page.emulateMediaFeatures([{
                    name: 'prefers-color-scheme',
                    value: 'dark'
                }])
            },
            beforeScreenshot: async (page) => {
                await page.waitForSelector('.page-element');
                await page.$$eval(
                    'img',
                    images => {
                        images.forEach(img => {
                            img.removeAttribute('src');
                            img.setAttribute('src', 'https://via.placeholder.com/100');
                        })
                    }
                );
            }
        })
    });
})