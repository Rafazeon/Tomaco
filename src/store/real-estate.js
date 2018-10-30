export default {
    loading: true,
    error: null,
    apply_filters: false,
    filters:
      {
        types: 'Residencial',
        goal: 'Venda',
        price_sell: [30000, 2000000],
        price_rent: [0, 10000],
        area: [0, 600],
        bedrooms: '',
        bathrooms: '',
        vacancies: ''
      }, 
    realestate: [
      {
        placeholder: true,
        id: 0,
        title: '---- --- -- ------',
        bedrooms: '---- --- -- ------ ---- --- -- ------ ---- --- -- ------ ---- --- -- ------',
        bathrooms: '---- ------ ',
        types_goal: '---- ------ ',
        description: '---- ------ ',
        images: [], 
        suites: '---- --- -- ------',
        vacancies: '---- --- -- ------',
        area: '---- --- -- ------',
        cep: '---- --- -- ------',
        address: '---- --- -- ------',
        number: '---- --- -- ------',
        complement: '---- --- -- ------',
        uf: '---- --- -- ------',
        city: '---- --- -- ------',
        neighborhood: '---- --- -- ------',
        price: '---- ------ '
      },
    ],
    latlong: []
  };
  