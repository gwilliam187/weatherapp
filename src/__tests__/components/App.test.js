import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import _ from 'lodash';
// import axios from 'axios';
// jest.mock('axios');

import App from '../../components/App';
import reducers from '../../reducers';
import successOpenWeatherJson from '../json/successOpenWeatherAPI';
import { fetchWeathersForSelectedCities } from '../../actions';

function setupStore() {
  return createStore(reducers, applyMiddleware(thunk));
}

const flushAllPromises = () => {
	return new Promise(resolve => setImmediate(resolve));
}

const mockAxios = {
  get: jest.fn().mockImplementation(() => {
    return new Promise((res, rej) => {
      mockAxios._resolve = res;
      mockAxios._reject = rej;
    });
  }),
  mockSuccess (resp) {
    this._resolve(resp);
  },
  mockError (resp) {
    this._reject(resp);
  },
  _resolve: null,
  _reject: null
};

describe('<App /> with Redux', () => {
	let wrapper;
	let store;

	beforeEach(() => {
		store = setupStore();
		wrapper = mount(
			<Provider store={store}><App /></Provider>
    );
	});

	test('Initializes successfully', () => {
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	test('Selecting Cities', async () => {
		const cityButton1 = wrapper.find('CityButton').at(0);
		const button1 = cityButton1.find('button');
		button1.simulate('click');

		const cityButton2 = wrapper.find('CityButton').at(1);
		const button2 = cityButton2.find('button');
		button2.simulate('click');
		const expectedState = 
		[
			{
				cityName: cityButton1.props().cityName,
				countryCode: cityButton1.props().countryCode		
			},
			{
				cityName: cityButton2.props().cityName,
				countryCode: cityButton2.props().countryCode		
			}
		]
		expect(store.getState().selectedCities).toEqual(expectedState);

		const selectedCities = store.getState().selectedCities;
		const promises = await selectedCities.map(async selectedCity => {
			const promise = mockAxios.get();
			mockAxios.mockSuccess({ status: 200, data: successOpenWeatherJson });
			return promise;
		});
		Promise.all(promises)
			.then(res => {
				let error = {};
				const weathers = res
					.map(currRes => {
						return currRes.data;
					});

				store.dispatch({
					type: 'FETCH_WEATHERS',
					payload: weathers
				});

				// console.log(weathers);
				// console.log(store.getState().weathers);
				expect(store.getState().weathers).toEqual(weathers);

				if(!_.isEmpty(error)) {
					store.dispatch(updateCitiesErrorMessage(error.city, 'CITY_NOT_FOUND'));
				}
				expect(store.getState().citiesErrorMessage).toEqual('');
				
			})
			.catch(err => {console.log(err)});
	});
});