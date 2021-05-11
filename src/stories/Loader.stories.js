import "../styles/common.css";
import LoaderComponent from "../components/Loader.vue";


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
