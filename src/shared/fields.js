import { useFormInput } from "./utils";

export const useSignupFields =  () => {
    return [
        {
            id: "display_name",
            label: "Name",
            required: true,
            input: {

                props: {

                    type: "text",
                    placeholder: "Solia Bratash"
                },
                state: useFormInput("")
            }
        },
        {
            id: "email",
            label: "Email",
            required: true,
            input: {

                props: {

                    type: "email",
                    placeholder: "solia@gmail.com"
                },
                state: useFormInput("")
            }
        },
        {
            id: "password",
            label: "Password",
            required: true,
            input: {

                props: {

                    type: "password",
                    placeholder: "*********"
                },
                state: useFormInput("")
            }
        }
    ];
}

export const useLoginFields = () => {

    return [

        {
            id: "email",
            label: "Email",
            required: true,
            input: {
                
                props: {
                    type: "email",
                    placeholder: "solia@gmail.com"
                },
                state: useFormInput("")
            }
        },
        {
            id: "password",
            label: "Password",
            required: true,
            input: {
                
                props: {
                    type: "password",
                    placeholder: "*******"
                },
                state: useFormInput("")
            }
        }
    ];
}