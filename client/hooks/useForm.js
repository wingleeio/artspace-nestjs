import { useState, useEffect } from 'react';

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

  return [formData, handleChange];
};

export default useForm;
