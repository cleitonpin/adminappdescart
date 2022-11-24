export const formatCep = (cep) => {
  return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
};

export const formatCnpj = (cnpj) => {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};