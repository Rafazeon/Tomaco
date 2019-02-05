import React from 'react';
import { Scene, Tabs, Stack, Drawer } from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/SignUp';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Login';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/ForgotPassword';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/UpdateProfile';


import CreateCategoryContainer from '../../containers/CreateCategory';
import CreateCategoryComponent from '../components/CreateCategory';

import CreateProductContainer from '../../containers/CreateProduct';
import CreateProductComponent from '../components/CreateProduct';

import ListProductContainer from '../../containers/ListProduct';
import ListProductComponent from '../components/ListProduct';

import OfferProductContainer from '../../containers/OfferProduct';
import OfferProductComponent from '../components/OfferProduct';

import OfferProductViewContainer from '../../containers/OfferProductView';
import OfferProductViewComponent from '../components/OfferProductView';

import listOrderContainer from '../../containers/ListOrder';
import listOrderComponent from '../components/ListOrder';

import MemberContainer from '../../containers/Member';
import ProfileComponent from '../components/Profile';

import SidebarComponent from '../components/Sidebar';

console.disableYellowBox = true;

const Index = (
  <Stack key="home">
    <Scene hideNavBar key="home1">
    <Drawer
      key="drawer"
        swipeEnabled
        type="replace"
        showLabel={false}
        {...DefaultProps.tabProps}
        drawerImage={require('../../images/menu.png')}
        contentComponent={SidebarComponent}> 
      
      <Tabs
        key="tabbar"
        swipeEnabled
        type="replace"
        showLabel={false}
        {...DefaultProps.tabProps}
      >
        {/* <Stack
          key="home"
          title={AppConfig.appName.toUpperCase()}
          icon={() => <Icon name="planet" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="home" component={AboutComponent} />
        </Stack>

        <Stack
          key="recipes"
          title="RECIPES"
          icon={() => <Icon name="book" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="recipes" component={RecipesContainer} Layout={RecipesComponent} />
        </Stack> */}

        <Stack
          key="profile"
          title="PERFIL"
          icon={() => <Icon name="contact" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="profileHome" component={MemberContainer} Layout={ProfileComponent} />
          <Scene
            back
            key="signUp"
            title="CRIAR CONTA"
            {...DefaultProps.navbarProps}
            component={SignUpContainer}
            Layout={SignUpComponent}
          />

          <Scene
            back
            key="login"
            title="LOGIN"
            {...DefaultProps.navbarProps}
            component={LoginContainer}
            Layout={LoginComponent}
          />
          <Scene
            back
            key="forgotPassword"
            title="ESQUECEU A SENHA"
            {...DefaultProps.navbarProps}
            component={ForgotPasswordContainer}
            Layout={ForgotPasswordComponent}
          />
          <Scene
            back
            key="updateProfile"
            title="ATUALIZAR PERFIL"
            {...DefaultProps.navbarProps}
            component={UpdateProfileContainer}
            Layout={UpdateProfileComponent}
          />
  
        </Stack>
      </Tabs>

      </Drawer> 
    </Scene>

    <Scene
      back
      clone
      key="createCategory"
      title="CRIAR NOVA CATEGORIA"
      {...DefaultProps.navbarProps}
      component={CreateCategoryContainer}
      Layout={CreateCategoryComponent}
    />

    <Scene
      back
      clone
      key="createProduct"
      title="CRIAR NOVO PRODUTO"
      {...DefaultProps.navbarProps}
      component={CreateProductContainer}
      Layout={CreateProductComponent}
    />

    <Scene
      back
      clone
      key="listProduct"
      title="MARCAR PRODUTO"
      {...DefaultProps.navbarProps}
      component={ListProductContainer}
      Layout={ListProductComponent}
    />

    <Scene
      back
      clone
      key="offerProduct"
      title="OFERTAR PRODUTO"
      {...DefaultProps.navbarProps}
      component={OfferProductContainer}
      Layout={OfferProductComponent}
    />

    <Scene
      back
      clone
      key="offerProductView"
      title="CRIAR OFERTA PRODUTO"
      {...DefaultProps.navbarProps}
      component={OfferProductViewContainer}
      Layout={OfferProductViewComponent}
    />

    <Scene
      back
      clone
      key="listOrder"
      title="LISTA DOS PEDIDOS"
      {...DefaultProps.navbarProps}
      component={listOrderContainer}
      Layout={listOrderComponent}
    />

  </Stack>
);

export default Index;
