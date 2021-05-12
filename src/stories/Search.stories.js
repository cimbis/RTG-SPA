import "../styles/common.css";
import SearchComponent from "../components/Search.vue";

import '../styles/colors.css';
import '../styles/common.css';

export default {
    title: 'Gify/Search',
    component: SearchComponent,
};

const Template = () => ({
    components: { SearchComponent },
    template: `
        <SearchComponent/>`,
});

export const Search = Template.bind({});
Search.args = {};
