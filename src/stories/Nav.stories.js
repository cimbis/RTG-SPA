import WhatInput from "what-input";
import "../styles/common.css";
import NavComponent from "../components/Nav.vue";
import { UI_STATE } from "../scripts/ui-state.js";

import '../styles/colors.css';
import '../styles/common.css';


WhatInput.specificKeys([9]);

export default {
    title: 'Gify/Nav',
    component: NavComponent,
    argTypes: {
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
    components: { NavComponent },
    template: `
        <NavComponent :uiState="uiState"/>`,
});

export const NavSearch = Template.bind({});
NavSearch.args = {
    uiState: UI_STATE.SEARCH
};

export const NavFavourites = Template.bind({});
NavFavourites.args = {
    uiState: UI_STATE.FAVOURITES
};