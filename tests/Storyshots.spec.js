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
        suite: 'Image Snapshots [LIGHT]',
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
                        })
                    }
                );
            },

            // 🤷‍♂️
            // storyKindRegex: /^((?!.*?Loader).)*$/,

            // 🤷‍♂️
            // getMatchOptions: ({ context: { kind, story}, device, viewport }) => ({
            //     customSnapshotIdentifier:
            //         (device ? `${ device.name }-` : '') +
            //         (viewport ? `${ viewport.width }X${ viewport.height }-` : '') +
            //         `${ kind }-${ story }`
            //             .toLowerCase()
            // }),
        })
    });
})

describe('Image Snapshots [DARK] [800x600]', () => {
    initStoryshots({
        suite: 'Image Snapshots [DARK] [800x600]',
        test: imageSnapshot({
            customizePage: async (page) => {
                await page.emulateMediaFeatures([{
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
                        })
                    }
                );
            }
        })
    });
})

describe('Image Snapshots [DARK] [DESKTOP]', () => {
    initStoryshots({
        suite: 'Image Snapshots [DARK] [DESKTOP]',
        test: imageSnapshot({
            customizePage: async (page) => {
                await page.emulateMediaFeatures([{
                    name: 'prefers-color-scheme',
                    value: 'dark'
                }])
                await page.setViewport({
                    width: 1280,
                    height: 800,
                    isMobile: false
                });
            },
            beforeScreenshot: async (page) => {
                await page.waitForSelector('.page-element');
                await page.$$eval(
                    'img',
                    images => {
                        images.forEach(img => {
                            img.removeAttribute('src');
                        })
                    }
                );
            }
        })
    });
})

describe('Image Snapshots [DARK] [MOBILE]', () => {
    initStoryshots({
        suite: 'Image Snapshots [DARK] [MOBILE]',
        test: imageSnapshot({
            customizePage: async (page) => {
                await page.emulateMediaFeatures([{
                    name: 'prefers-color-scheme',
                    value: 'dark'
                }])

                await page.setViewport({
                    width: 375,
                    height: 812,
                    deviceScaleFactor: 1,
                    isMobile: true,
                    hasTouch: true,
                    isLandscape: false
                });
            },
            beforeScreenshot: async (page) => {
                await page.waitForSelector('.page-element');
                await page.$$eval(
                    'img',
                    images => {
                        images.forEach(img => {
                            img.removeAttribute('src');
                        })
                    }
                );
            }
        })
    });
})


