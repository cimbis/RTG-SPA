import "../styles/common.css";
import SearchComponent from "../components/Search.vue";
import LoaderComponent from "../components/Loader.vue";
import NavComponent from "../components/Nav.vue";
import GifyListComponent from '../components/GifyList.vue';
import { UI_STATE } from "../scripts/ui-state.js";


import '../styles/colors.css';
import '../styles/common.css';


export default {
    title: 'Gify/SearchAndFriends',
};

const SearchWithLoaderTemplate = () => ({
    components: { SearchComponent, LoaderComponent },
    template: `
        <div>
        <SearchComponent/>
        <LoaderComponent/>
        </div>
    `,
});

export const SearchWithLoader = SearchWithLoaderTemplate.bind({});
SearchWithLoader.args = {};


const SearchWithNavTemplate = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { SearchComponent, NavComponent },
    template: `
        <div>
        <NavComponent :uiState="uiState"/>
        <SearchComponent/>
        </div>
    `,
});

export const SearchWithNav = SearchWithNavTemplate.bind({});
SearchWithNav.args = {
    uiState: UI_STATE.SEARCH
};


const ExampleGify = {
    bitly_url: "https://gph.is/g/Eq0nMYR",
    gif_url: "https://media3.giphy.com/media/DhstvI3zZ598Nb1rFf/100.gif?cid=3f6f14a901eyx8p8dux494yv42ynoyohj7jdmuvqxh6dypce&rid=100.gif&ct=g",
    title: "Happy Season 9 GIF by The Office",
    username: "theoffice",
};

const SearchWithGifiesTemplate = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { SearchComponent, GifyList: GifyListComponent },
    template: `
        <div>
        <SearchComponent/>
        <GifyList
            :gifies="gifies"
            :ui-state="uiState"
        />
        </div>
    `,
});

export const SearchWithGifies = SearchWithGifiesTemplate.bind({});
SearchWithGifies.args = {
    gifies: [
        ExampleGify,
        ExampleGify,
        ExampleGify,
    ],
    uiState: UI_STATE.SEARCH
};