import { fireEvent, render } from "@testing-library/vue";
import Search from "../src/components/Search.vue";


describe('Search', () => {
    let renderResult;

    beforeEach(() => {
        renderResult = render(Search);
    })

    test('should emit on button press', async () => {
        const inputNode = renderResult.container.querySelector('input');
        const buttonNode = renderResult.container.querySelector('button');

        await fireEvent.input(inputNode, { target: { value: 'lol' } });
        await fireEvent.click(buttonNode);

        expect(renderResult.emitted().searchGifies[0][0]).toEqual('lol');
    })

    test('should emit on form submit', () => {
        const inputNode = renderResult.container.querySelector('input');
        const formNode = renderResult.container.querySelector('form');

        fireEvent.change(inputNode, { target: { value: 'lol' } });
        fireEvent.submit(formNode);

        expect(renderResult.emitted().searchGifies[0][0]).toEqual('lol');
    })
})