import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {  SignUpFormState } from '@/lib/zod/signup-form-schema';
import { Eye, EyeOff } from 'lucide-react';
import { useState, type FC } from 'react'




interface Props {
    name: 'password'
    state: SignUpFormState
}

const TextAreaInputPassword: FC<Props> = ({ name, state }) => {

    const [showPassword, setShowPassword] = useState(false)

    const handleChangePasswordVisibility = () => setShowPassword(prev => !prev)

    return (
        <FormField
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-semibold">Please insert your {name}</FormLabel>
                    <FormControl>
                        <div className='relative'>
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder={`${name.charAt(0).toUpperCase()}${name.slice(1).toLowerCase()}...`}
                                {...field}
                            />

                            {showPassword ?
                                <EyeOff onClick={handleChangePasswordVisibility} className=' absolute right-3 top-2 cursor-pointer' />
                                :
                                <Eye onClick={handleChangePasswordVisibility} className='absolute right-3 top-2 cursor-pointer' />
                            }
                        </div>

                    </FormControl>

                    <div className="h-1"> {/* Esto mantiene el espacio reservado para los errores */}
                        {state?.errors?.[name] && (
                            <FormMessage className="text-red-500">
                                {state.errors?.[name].join(', ')}
                            </FormMessage>
                        )}
                    </div>
                </FormItem>
            )}
        />
    )
}

export default TextAreaInputPassword;