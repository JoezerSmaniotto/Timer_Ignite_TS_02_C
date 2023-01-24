import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod' // Usa essa sintase quando a biblioteca que esta importando não tem o export default

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

import { NewCycleForm } from './Components/NewCycleForm'
import { Countdown } from './Components/Countdown'
import { useContext } from 'react'
import { CycleContext } from '../../contexts/CyclesContext'

const newCycleFormValidationShema = zod.object({
  // Se der um console no resulado do data função handleCreateNewCycle verá q é um object por isso
  //, aqui foi usado zod.object para validar os campos.
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa de ser no mínimo 5 minutos')
    .max(60, 'O ciclo precisa de ser no máximo 60 minutos'),
  // validação, a regra e mensagem caso esta não a regra não sejá satisfeita. ex: min(5, 'O ciclo precisa de ser no mínimo 5 minutos')
})

// interface NewCycleFormData {
//   // A validação esta perfeita, porém com o ZOD não preciso adicionar a tipagem
//   task: string // Consigo extrair a typagem de dentro do schemma de validação.
//   minutesAmount: number
// }

type NewCycleFormData = zod.infer<typeof newCycleFormValidationShema>
/* 
  Desta forma a medida que adiciono campos na validação ele já adiciona na interface gerado automaticamente
  pelo ZOD com o zod.infer, adicionei o typeof, pois não posso em TypeScript passar variaveis JacaScript 
  direto para o type o TypeScript, pir este motivo uso o typeof
*/

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CycleContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationShema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
