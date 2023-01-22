import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod' // Usa essa sintase quando a biblioteca que esta importando não tem o export default

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  Separator,
  StartCountdownButton,
  TaskInput,
  MinutesAmountInput,
} from './styles'

const newCycleFormValidationShema = zod.object({
  // Se der um console no resulado do data função handleCreateNewCycle verá q é um object por isso
  //, aqui foi usado zod.object para validar os campos.
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa de ser no mínimo 5 minutos')
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
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationShema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="tash-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <datalist id="tash-suggestions">
            <option value="Projeto1" />
            <option value="Projeto2" />
            <option value="Projeto3" />
            <option value="banana" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            // max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
