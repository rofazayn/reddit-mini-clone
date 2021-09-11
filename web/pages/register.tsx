import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Container } from '@chakra-ui/layout';
import { Form, Formik } from 'formik';
import React, { ReactElement } from 'react';
import InputField from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import registerValidationSchema from '../validation/register';

interface RegisterPageProps {}

function RegisterPage({}: RegisterPageProps): ReactElement {
  const [_, register] = useRegisterMutation();
  return (
    <Container>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={registerValidationSchema}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='username'
              label='Username'
              placeholder='Username'
            />
            <InputField
              name='password'
              label='Password'
              placeholder='Password'
              type='password'
            />
            <Button colorScheme='teal' isLoading={isSubmitting} type='submit'>
              Create account
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default RegisterPage;