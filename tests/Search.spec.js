import { fireEvent, render } from "@testing-library/vue";
import Search from "../src/components/Search.vue";


// expect.extend(toHaveNoViolations);
//
// describe('Search a11y', () => {
//     test('should pass axe a11y test', async () => {
//         const { container } = render(Search);
//         const results = await axe(container);
//         expect(results).toHaveNoViolations();
//     });
// });

describe('Search', () => {
    let renderResult;

    beforeEach(() => {
        renderResult = render(Search);
    });

    test('should emit on button press', async () => {
        const inputNode = renderResult.container.querySelector('input');
        const buttonNode = renderResult.container.querySelector('button');

        await fireEvent.update(inputNode, 'lol');
        await fireEvent.click(buttonNode);

        expect(renderResult.emitted().searchGifies[0][0]).toEqual('lol');
    })

    test('should emit on form submit', async () => {
        const inputNode = renderResult.container.querySelector('input');
        const formNode = renderResult.container.querySelector('form');

        await fireEvent.update(inputNode, 'lol');
        await fireEvent.submit(formNode);

        const emitted = renderResult.emitted();

        expect(emitted.searchGifies[0][0]).toEqual('lol');
    })
})