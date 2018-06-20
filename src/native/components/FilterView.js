import React, { Component } from 'react'

import { StyleSheet, TouchableOpacity, Picker, Button } from 'react-native'

import { Content, Container, List, ListItem, Body, Text, View } from 'native-base'

import { Dropdown } from 'react-native-material-dropdown';

import { Actions } from 'react-native-router-flux'

import MultiSlider from '@ptomasroos/react-native-multi-slider';

class FilterView extends Component {
    constructor(props) {
        super(props)

        const filters = this.props.filters;
        
        this.state = {
            goal: filters.goal,
            types_goal: filters.types,
            bedrooms: filters.bedrooms,
            bathrooms: filters.bathrooms,
            vacancies: filters.vacancies,
            multiSliderValueSell: filters.price_sell,
            multiSliderValueRent: filters.price_rent,
            multiSliderValueArea: filters.area
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleBedrooms = this.handleBedrooms.bind(this)
        this.selectionOnPress = this.selectionOnPress.bind(this)
        this.clearFilter = this.clearFilter.bind(this)

    }

    

    selectionOnPress(name) {

        this.setState({goal: name })
    }

    clearFilter() {
        const cleanFilterState = this.props.cleanFilterState;
        const filters = 
        {
          types: 'Residencial',
          goal: 'Venda', 
          price_sell: [0, 2000000],
          price_rent: [0, 10000],
          area: [0, 600],
          bedrooms: '',
          bathrooms: '',
          vacancies: ''
        }

        cleanFilterState(filters);
        Actions.realestate()
    }
    
      multiSliderValuesChangeSell = (values) => {
        this.setState({
          multiSliderValueSell: values,
        });
      }

      multiSliderValuesChangeRent = (values) => {
        this.setState({
          multiSliderValueRent: values,
        });
      }

      multiSliderValuesChangeArea = (values) => {
        this.setState({
          multiSliderValueArea: values,
        });
      }

    handleBedrooms(name){
        this.setState({bedrooms: name }) 
    }

    handleBathrooms(name){
        this.setState({bathrooms: name }) 
    }

    handleVacancies(name){
        this.setState({vacancies: name }) 
    }

    handleTypesGoal(name, val) {
        this.setState({types_goal: val})
    }
    
    handleSubmit() {
        const setFilterState = this.props.setFilterState;
        const filters = 
        {
          types: this.state.types_goal,
          goal: this.state.goal,  
          price_sell: this.state.multiSliderValueSell,
          price_rent: this.state.multiSliderValueRent,
          area: this.state.multiSliderValueArea,
          bedrooms: this.state.bedrooms,
          bathrooms: this.state.bathrooms,
          vacancies: this.state.vacancies
        }

        setFilterState(filters);
        Actions.realestate()
    }

    render() {
        const options = [{
                value: 'Residencial',
              }, {
                value: 'Comercial',
              }];
              
        return (
        <Container style={{backgroundColor: '#fff', height: 800}}>
        <Content>
            <View style={styles.MainContainer}>
                <TouchableOpacity value={this.state.goal}
                    style={{backgroundColor: this.state.goal === "Venda" ? 'blue' : '#DDDDDD', alignItems: 'center', padding: 10, width: '45%' }}
                    onPress={() => this.selectionOnPress('Venda')}
                >
                    <Text style={{color: '#fff'}}> Comprar </Text>
                </TouchableOpacity>

                <TouchableOpacity value={this.state.goal}
                    style={{backgroundColor: this.state.goal === "Alugar" ? 'blue' : '#DDDDDD', alignItems: 'center', padding: 10, width: '45%' }}
                    onPress={() => this.selectionOnPress('Alugar')}
                >
                    <Text style={{color: '#fff'}}> Alugar </Text>
                </TouchableOpacity>
            </View>

            

            <View>
                <View style={{marginLeft: 25, marginRight: 25}}>
                    <Dropdown
                        label='Tipo Residencial'
                        value={this.state.types_goal}
                        data={options}
                        onChangeText={v => this.handleTypesGoal('types_goal', v)}
                    />
                </View>
                
                <View style={styles.container}>
                {this.state.goal === 'Venda' ? 
                <View style={styles.sliders}>
                <View style={styles.sliderOne}>
                    <Text style={styles.text}>Selecione o Valor</Text>
                    <Text style={styles.text}>{this.state.multiSliderValueSell[0]} </Text>
                    <Text style={styles.text}>{this.state.multiSliderValueSell[1]}</Text>
                </View>
                <View style={{marginLeft: 25}}>
                    <MultiSlider
                        values={[this.state.multiSliderValueSell[0], this.state.multiSliderValueSell[1]]}
                        sliderLength={290}
                        onValuesChange={this.multiSliderValuesChangeSell}
                        min={0}
                        max={2000000}
                        step={1}
                        allowOverlap
                        snapped
                    />
                </View>
                </View> : <View></View> }

                {this.state.goal === 'Alugar' ? 
                <View style={styles.sliders}>
                <View style={styles.sliderOne}>
                    <Text style={styles.text}>Selecione o Valor</Text>
                    <Text style={styles.text}>{this.state.multiSliderValueRent[0]} </Text>
                    <Text style={styles.text}>{this.state.multiSliderValueRent[1]}</Text>
                </View>
                <View style={{marginLeft: 25}}>
                    <MultiSlider
                        values={[this.state.multiSliderValueRent[0], this.state.multiSliderValueRent[1]]}
                        sliderLength={290}
                        onValuesChange={this.multiSliderValuesChangeRent}
                        min={0}
                        max={10000}
                        step={1}
                        allowOverlap
                        snapped
                    />
                </View>
                </View> : <View></View> }

                <View style={styles.sliders}>
                <View style={styles.sliderOne}>
                    <Text style={styles.text}>Selecione a Área</Text>
                    <Text style={styles.text}>{this.state.multiSliderValueArea[0]} </Text>
                    <Text style={styles.text}>{this.state.multiSliderValueArea[1]}</Text>
                </View>
                <View style={{marginLeft: 25}}>
                    <MultiSlider
                        values={[this.state.multiSliderValueArea[0], this.state.multiSliderValueArea[1]]}
                        sliderLength={290}
                        onValuesChange={this.multiSliderValuesChangeArea}
                        min={0}
                        max={600}
                        step={1}
                        allowOverlap
                        snapped
                    />
                </View>
                </View>

        
            </View>
                
                <Text style={{marginLeft: 20}}>Número de Quartos</Text>
                <View style={styles.MainContainer}>
                    <TouchableOpacity value={this.state.bedrooms}
                        style={{backgroundColor: this.state.bedrooms === 1 ? 'blue' : '#DDDDDD', alignItems: 'center', padding: 10, width: '19%' }}
                        onPress={() => this.handleBedrooms(1)}
                    >
                        <Text style={{color: '#fff'}}> 1 </Text>
                    </TouchableOpacity>

                    <TouchableOpacity value={this.state.bedrooms}
                        style={{backgroundColor: this.state.bedrooms === 2 ? 'blue' : '#DDDDDD', alignItems: 'center', padding: 10, width: '19%' }}
                        onPress={() => this.handleBedrooms(2)}
                    >
                        <Text style={{color: '#fff'}}> 2 </Text>
                    </TouchableOpacity>

                    <TouchableOpacity value={this.state.bedrooms}
                        style={{backgroundColor: this.state.bedrooms === 3 ? 'blue' : '#DDDDDD', alignItems: 'center', padding: 10, width: '19%' }}
                        onPress={() => this.handleBedrooms(3)}
                    >
                        <Text style={{color: '#fff'}}> 3 </Text>
                    </TouchableOpacity>

                    <TouchableOpacity value={this.state.bedrooms}
                        style={{backgroundColor: this.state.bedrooms === 4 ? 'blue' : '#DDDDDD', alignItems: 'center', padding: 10, width: '19%' }}
                        onPress={() => this.handleBedrooms(4)}
                    >
                        <Text style={{color: '#fff'}}> 4 </Text>
                    </TouchableOpacity>

                    <TouchableOpacity value={this.state.bedrooms}
                        style={{backgroundColor: this.state.bedrooms === 5 ? 'blue' : '#DDDDDD', alignItems: 'center', padding: 10, width: '19%' }}
                        onPress={() => this.handleBedrooms(5)}
                    >
                        <Text style={{color: '#fff'}}> 5+ </Text>
                    </TouchableOpacity>             
                </View>
            

            <Text style={{marginLeft: 20}}>Número de Banheiros</Text>
            <View style={styles.MainContainer}>
                    <TouchableOpacity value={this.state.bathrooms}
                        style={{backgroundColor: this.state.bathrooms === 1 ? 'blue' : '#DDDDDD', alignItems: 'center', padding: 10, width: '19%' }}
                        onPress={() => this.handleBathrooms(1)}
                    >
                        <Text style={{color: '#fff'}}> 1 </Text>
                    </TouchableOpacity>

                    <TouchableOpacity value={this.state.bathrooms}
                        style={{backgroundColor: this.state.bathrooms === 2 ? 'blue' : '#DDDDDD', alignItems: 'center', padding: 10, width: '19%' }}
                        onPress={() => this.handleBathrooms(2)}
                    >
                        <Text style={{color: '#fff'}}> 2 </Text>
                    </TouchableOpacity>

                    <TouchableOpacity value={this.state.bathrooms}
                        style={{backgroundColor: this.state.bathrooms === 3 ? 'blue' : '#DDDDDD', alignItems: 'center', padding: 10, width: '19%' }}
                        onPress={() => this.handleBathrooms(3)}
                    >
                        <Text style={{color: '#fff'}}> 3 </Text>
                    </TouchableOpacity>

                    <TouchableOpacity value={this.state.bathrooms}
                        style={{backgroundColor: this.state.bathrooms === 4 ? 'blue' : '#DDDDDD', alignItems: 'center', padding: 10, width: '19%' }}
                        onPress={() => this.handleBathrooms(4)}
                    >
                        <Text style={{color: '#fff'}}> 4 </Text>
                    </TouchableOpacity>

                    <TouchableOpacity value={this.state.bathrooms}
                        style={{backgroundColor: this.state.bathrooms === 5 ? 'blue' : '#DDDDDD', alignItems: 'center', padding: 10, width: '19%' }}
                        onPress={() => this.handleBathrooms(5)}
                    >
                        <Text style={{color: '#fff'}}> 5+ </Text>
                    </TouchableOpacity>             
                </View>

            <Text style={{marginLeft: 20}}>Número de Vagas</Text>
            <View style={styles.MainContainer}>
                    <TouchableOpacity value={this.state.vacancies}
                        style={{backgroundColor: this.state.vacancies === 1 ? 'blue' : '#DDDDDD', alignItems: 'center', padding: 10, width: '19%' }}
                        onPress={() => this.handleVacancies(1)}
                    >
                        <Text style={{color: '#fff'}}> 1 </Text>
                    </TouchableOpacity>

                    <TouchableOpacity value={this.state.vacancies}
                        style={{backgroundColor: this.state.vacancies === 2 ? 'blue' : '#DDDDDD', alignItems: 'center', padding: 10, width: '19%' }}
                        onPress={() => this.handleVacancies(2)}
                    >
                        <Text style={{color: '#fff'}}> 2 </Text>
                    </TouchableOpacity>

                    <TouchableOpacity value={this.state.vacancies}
                        style={{backgroundColor: this.state.vacancies === 3 ? 'blue' : '#DDDDDD', alignItems: 'center', padding: 10, width: '19%' }}
                        onPress={() => this.handleVacancies(3)}
                    >
                        <Text style={{color: '#fff'}}> 3 </Text>
                    </TouchableOpacity>

                    <TouchableOpacity value={this.state.vacancies}
                        style={{backgroundColor: this.state.vacancies === 4 ? 'blue' : '#DDDDDD', alignItems: 'center', padding: 10, width: '19%' }}
                        onPress={() => this.handleVacancies(4)}
                    >
                        <Text style={{color: '#fff'}}> 4 </Text>
                    </TouchableOpacity>

                    <TouchableOpacity value={this.state.vacancies}
                        style={{backgroundColor: this.state.vacancies === 5 ? 'blue' : '#DDDDDD', alignItems: 'center', padding: 10, width: '19%' }}
                        onPress={() => this.handleVacancies(5)}
                    >
                        <Text style={{color: '#fff'}}> 5+ </Text>
                    </TouchableOpacity>             
                </View>

            <View style={{marginTop: 10, alignItems: 'center'}}>
                 <TouchableOpacity onPress={this.clearFilter} title='Limpar Filtros'><Text>Limpar Filtros</Text></TouchableOpacity>
            </View>

            <View style={{marginTop: 30}}>
                    <Button onPress={this.handleSubmit} title='Aplicar Filtros' />
            </View>
            </View>
            </Content>
        </Container>
        )
    }
    
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10
      },
      sliders: {
        width: 280,
      },
      text: {
        alignSelf: 'center',
        paddingVertical: 20,
      },
      title: {
        fontSize: 30,
      },
      sliderOne: {
        flexDirection: 'row',
        justifyContent: 'space-around'
      },
      button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
      },
      countContainer: {
        alignItems: 'center',
        padding: 10
      },
      countText: {
        color: '#FF00FF'
      },

    MainContainer :{
     
    justifyContent: 'space-evenly', 
    flexDirection: 'row', 
    padding: 15,
    width: '100%',
     
    }
     
});

export default FilterView;
