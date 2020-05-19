import { shallowMount } from '@vue/test-utils'
import Test from '../Test.vue'

describe('Test.vue',  () => {
  test('Renderizar title', () => {
  	//props
    const title = 'title';

    const wrapper = shallowMount(Test, {
      propsData: {
      	title
      }
    });
    expect(wrapper.text()).toBe(title);
  });

  test('Renderizar <a>', () => {
    //props
    const title = 'title';

    const wrapper = shallowMount(Test, {
      propsData: {
        title
      }
    });
    expect(wrapper.find('a')).toBe(true);
  });
});