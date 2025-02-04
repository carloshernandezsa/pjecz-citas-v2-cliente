import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, Grid, Input, TextField, Typography } from '@mui/material'

import ContainerCardCenter from '../ui/ContainerCardCenter'
import commonSX from '../../theme/CommonSX'
import '../../css/global.css'

import { RecoverAccountConfirm } from '../../actions/AuthActions'
import ReCAPTCHA from 'react-google-recaptcha'


const cleanFormData = {
    password: '',
    password2: '',
}

const RecoverAccountConfirmScreen = () => {

    let {search} = useLocation()
    let parametros = new URLSearchParams(search)
    let hashid = parametros.get('hashid')
    let cadena_validar = parametros.get('cadena_validar')

    // variables de estado para captcha
    const [captchaValido, setCaptachaValido] = useState(null)

    // Referencia al checkbox 'recaptcha'
    const captcha = useRef(null)

    // Funcion de evento onChange
    const onChangeCaptcha = () => {
        if(captcha.current.getValue()){
            setCaptachaValido(true)
            console.log("google regreso un token y no es un robot")
        }else{
            console.log("Detectado como robot")
        }
    }

    const [formData, setFormValues] = useState({
        password: '',
        password2: '',
        hashid: hashid,
        cadena_validar:cadena_validar,
    })
    const [formSent, setFormSent] = useState(false)

    const handleChange = (evento) => {
        const { name, value } = evento.target
        setFormValues((prevState) => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    }

    const submitForm = () => {
        RecoverAccountConfirm(formData).then( response => {
            if(captchaValido){
                console.log(response)
            }else{
                setCaptachaValido(false)
            }
        })
        setFormValues(cleanFormData)
        setFormSent(true)
    }

    if (formSent) {
        return (
            <ContainerCardCenter>
                <Typography variant='h5' sx={commonSX.title}>
                    Ha cambiado su contraseña
                </Typography>
                <Typography variant='body1'>
                    Tome nota de su nueva contraseña y guardela en un lugar seguro.
                </Typography>
                <Typography variant='body1'>
                    <Button component={Link} to='/' variant='contained'>
                        Regresar al inicio
                    </Button>
                </Typography>
            </ContainerCardCenter>
        )
    } else {
        return (
            <ContainerCardCenter>
                <Typography variant='h5' sx={commonSX.title}>
                    Cambiar mi contraseña
                </Typography>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Cambiar contraseña"
                                type="password"
                                fullWidth
                                name='password'
                                onChange={handleChange}
                                value={formData.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Confirmar contraseña"
                                type="password"
                                fullWidth
                                name='password2'
                                onChange={handleChange}
                                value={formData.password2}
                            />
                        </Grid>
                        <Grid item xs={12}>

                            <Typography component={'span'} variant={'body2'}>
                                <ReCAPTCHA
                                    ref={captcha}
                                    sitekey='6LdL-yMgAAAAAFaW2_5KwUlT5FXJjZYaPQd7fFbP'
                                    onChange={onChangeCaptcha}
                                />
                                { (captchaValido === false) ? <Typography variant='body1'>Seleccione el captcha para continuar</Typography> : null }
                            </Typography>

                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant='contained'
                                fullWidth
                                type='submit'
                                onClick={submitForm}
                            >
                                Cambiar mi contraseña
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='body1'>
                                <Link to='/' className='link'>
                                    Si no quieres cambiarla, regresa al inicio
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Input
                        type="hidden"
                        value={hashid}
                        name="hashid"
                    />
                    <Input
                        type="hidden"
                        value={cadena_validar}
                        name="cadena_validar"
                    />
                </form>
            </ContainerCardCenter>
        )
    }

}

export default RecoverAccountConfirmScreen
