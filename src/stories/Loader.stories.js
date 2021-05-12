import "../styles/common.css";
import LoaderComponent from "../components/Loader.vue";

import '../styles/colors.css';
import '../styles/common.css';


export default {
    title: 'Gify/Loader',
    component: LoaderComponent,
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { LoaderComponent },
    template: `
        <LoaderComponent/>`,
});

export const Loader = Template.bind({});
Loader.args = {};
