import "../styles/common.css";
import TitleComponent from "../components/Title.vue";

import '../styles/colors.css';
import '../styles/common.css';


export default {
    title: 'Gify/Title',
    component: TitleComponent,
    argTypes: {
        msg: {
            control: {
                type: 'string'
            }
        },
        desc: {
            control: {
                type: 'string'
            }
        }
    },
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { TitleComponent },
    template: `
        <TitleComponent :msg="msg" :desc="desc"/>`,
});

export const Title = Template.bind({});
Title.args = {
    msg: "Gify App",
    desc: "The only one you'll ever need"
};
