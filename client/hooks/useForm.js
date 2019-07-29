import { useState } from 'react';

const useForm = props => {
  const initialState = { ...props };
  const [formData, setFormData] = useState(initialState);

  const handleChange = e => {
    e.persist();
    setFormData(formData => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  const changeValue = (key, value) => {
    setFormData(formData => ({
      ...formData,
      [key]: value,
    }));
  };

  return [formData, handleChange, changeValue];
};

export default useForm;
