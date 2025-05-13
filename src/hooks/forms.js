import axios from '@/lib/axiosClient'

export const useForms = () => {
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const contactForm = async ({setErrors, setStatus}, props) => {
        await csrf();
        
        console.log("from forms.js")
        
        setErrors([])
        
        axios
        .post('/contact_form', props)
        .then(response => {
            setStatus(response.data.status);
            console.log(response.data)
        })
        .catch(error => {
            if (error.response.status !== 422) throw error
            
            setErrors(error.response.data.errors)
        })
    }

    const quotationForm = async ({setErrors, setStatus}, props) => {
        await csrf();
        
        console.log("from forms.js")
        
        setErrors([])
        
        axios
        .post('/quotation_form', props)
        .then(response => {
            setStatus(response.data.status);
            console.log(response.data)
        })
        .catch(error => {
            if (error.response.status !== 422) throw error
            
            setErrors(error.response.data.errors)
        })
    }

    const contactFormDirect = async ({setErrors, setStatus}, props) => {
        
        console.log("from forms.js")
        
        setErrors([])
        
        axios
        .post('/api/send_form.php', props)
        .then(response => {
            setStatus(response.data.status);
            console.log(response.data)
        })
        .catch(error => {
            if (error.response.status !== 422) throw error
            
            setErrors(error.response.data.errors)
        })
    }

    return {
        contactForm,
        quotationForm,
        contactFormDirect,
    }
}