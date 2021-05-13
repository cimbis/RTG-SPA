// import puppeteer from 'puppeteer';
//
// describe('Search', () => {
//     let browser;
//     let page;
//
//     beforeAll(async () => {
//         browser = await puppeteer.launch();
//     });
//
//     beforeEach(async () => {
//         page = await browser.newPage();
//     });
//
//     afterEach(async () => {
//         await page.close();
//     });
//
//     afterAll(() => {
//         browser.close();
//     });
//
//     describe('desktop viewport', () => {
//         beforeEach(async () => {
//             await page.setViewport({
//                 width: 1280,
//                 height: 800,
//                 isMobile: false
//             });
//         });
//
//         test('Default', async () => {
//             await page.goto('http://localhost:6006/?path=/story/gify-search--search');
//             const screenshot = await page.screenshot({ fullPage: true });
//             expect(screenshot).toMatchImageSnapshot();
//         });
//     });
// });