import './App.css';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function App() {
  const [formValues, setFormValues] = useState({ email: "", password: "", favClass: "1" })
  const [validationStates, setValidationStates] = useState({
    email: true,
    password: true,
  });

  const handleEmailChange = ((e) => {
    const emailValue = e.target.value;
    setFormValues({ ...formValues, email: emailValue });
  });

  const handleEmailValidation = (() => {
    const emailValue = formValues.email;
    console.log(emailValue);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    console.log(isValidEmail);
    setValidationStates({ ...validationStates, email: isValidEmail });
    console.log(validationStates);
  })

  const handlePasswordChange = ((e) => {
    const passwordValue = e.target.value;
    setFormValues({ ...formValues, password: passwordValue });
    const passwordPattern = /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/;
    const isValidPassword = passwordPattern.test(passwordValue);
    setValidationStates({ ...validationStates, password: isValidPassword });
  });

  const handleSelectChange = ((e) => {
    setFormValues({ ...formValues, favClass: e.target.value })
  });

  const clickSubmit = async () => {
    await handleEmailValidation();
    if (validationStates.email && validationStates.password) {
      alert(JSON.stringify(formValues));
    } else {
      alert('Porfavor corregir los errores del formulario antes de enviar');
    }
  };
  

  useEffect(() => {
    
  }, [validationStates.email]);

  return (
    <div>
      <h1>Ejemplo de formularios!</h1>

      <Form>
        <Form.Group className="mb-6" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleEmailChange}
            value={formValues.email}
            isInvalid={!validationStates.email}
          />
          {!validationStates.email &&
            <Form.Control.Feedback type="invalid">
            Porfavor ingresar direccion de correo valida.
          </Form.Control.Feedback>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={formValues.password}
            isInvalid={!validationStates.password}
          />
          <Form.Control.Feedback type="invalid">La contraseña deberia tener al menos 9 caracteres y tener numeros y letras</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Favorite Class</Form.Label>
          <Form.Select onChange={handleSelectChange} value={formValues.favClass}>
            <option value="1">ISIS3710</option>
            <option value="2">Programación con tecnologías web</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" onClick={clickSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
