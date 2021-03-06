import { mount } from '@vue/test-utils'
import PatientsList from '@/components/PatientsList.vue'
import PatientItem from '@/components/PatientItem.vue'
import Vue from 'vue'
import { patients } from './mocks'

describe('PatientsList', () => {
  it('renders a list of two patients', () => {
    const wrapper = mount(PatientsList, {
      propsData: {
        patients,
      },
      mocks: {
        $nuxt: {
          context: {
            $device: {
              isDesktopOrTablet: false,
            },
          },
        },
      },
    })

    const firstPatient = wrapper.findAllComponents(PatientItem).at(0)
    const secondPatient = wrapper.findAllComponents(PatientItem).at(1)

    expect(firstPatient.find('[data-test="name"]').text()).toBe(
      'Silvia Castillo'
    )
    expect(firstPatient.find('[data-test="gender"]').text()).toContain('female')
    expect(firstPatient.find('[data-test="birthday"]').text()).toBe(
      '05/17/1986'
    )
    expect(secondPatient.find('[data-test="name"]').text()).toBe(
      'Barbara Douglas'
    )
    expect(secondPatient.find('[data-test="gender"]').text()).toContain(
      'female'
    )
    expect(secondPatient.find('[data-test="birthday"]').text()).toBe(
      '04/20/1996'
    )
  })

  it('returns message when list is empty', async () => {
    const wrapper = mount(PatientsList, {
      propsData: {
        patients: [],
      },
      mocks: {
        $nuxt: {
          context: {
            $device: {
              isDesktopOrTablet: false,
            },
          },
        },
      },
    })

    wrapper.setData({ isLoading: false })
    await Vue.nextTick()

    expect(wrapper.find('[data-test="not-found-message"]').text()).toBe(
      'No results found.'
    )
  })
})
