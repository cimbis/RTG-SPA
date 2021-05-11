import "../styles/common.css";
import GifyList from '../components/GifyList.vue';
import { UI_STATE } from "../scripts/ui-state.js";


const ExampleGify = {
    bitly_url: "https://gph.is/g/Eq0nMYR",
    gif_url: "https://media3.giphy.com/media/DhstvI3zZ598Nb1rFf/100.gif?cid=3f6f14a901eyx8p8dux494yv42ynoyohj7jdmuvqxh6dypce&rid=100.gif&ct=g",
    title: "Happy Season 9 GIF by The Office",
    username: "theoffice",
};

export default {
    title: 'Gify/GifyList',
    component: GifyList,
    argTypes: {
        gifies: {
            control: {
                type: 'array'
            }
        },
        uiState: {
            options: [UI_STATE.SEARCH, UI_STATE.FAVOURITES],
            control: {
                type: 'radio',
            }
        },
    },
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { GifyList },
    template: `
        <GifyList
            :gifies="gifies"
            :ui-state="uiState"
        />`,
});

export const SearchWithOneGify = Template.bind({});
SearchWithOneGify.args = {
    gifies: [
        ExampleGify,
    ],
    uiState: UI_STATE.SEARCH,
};



export const SearchWithSomeGifies = Template.bind({});
SearchWithSomeGifies.args = {
    gifies: [
        ExampleGify,
        ExampleGify,
        ExampleGify,
    ],
    uiState: UI_STATE.SEARCH,
};

export const FavouritesWithOneGify = Template.bind({});
FavouritesWithOneGify.args = {
    gifies: [
        ExampleGify,
    ],
    uiState: UI_STATE.FAVOURITES,
};

export const FavouritesWithSomeGifies = Template.bind({});
FavouritesWithSomeGifies.args = {
    gifies: [
        ExampleGify,
        ExampleGify,
        ExampleGify,
    ],
    uiState: UI_STATE.FAVOURITES,
};