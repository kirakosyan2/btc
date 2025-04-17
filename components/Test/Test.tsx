import React, { useState } from 'react'
import { TestView } from './Test.view'
import { AnswersUser, AnswersUserPayload, TResultTest, useTestQuery, useTestsQuery, useTestSubmitMutation } from '@src/redux/test/test'
import { notificationEasy } from '@src/utils'
import { ResultTest } from './components/ResultTest'

export const Test: React.FC = () => {
  const [resultTest, setResultTest] = useState<TResultTest>()

  // Query
  const { data: testsList } = useTestsQuery()
  const { data: test } = useTestQuery(String(testsList?.[0]?.id), {
    skip: !testsList?.length,
    refetchOnMountOrArgChange: true
  })

  // Mutations
  const [submitTest, { isLoading: isLoadingTest }] = useTestSubmitMutation()


  const onSubmit = async (data: AnswersUser[]) => {
    const payload: AnswersUserPayload = {
      id: Number(testsList?.[0]?.id),
      answers: [...data]
    }

    const res: any = await submitTest(payload)

    if (res?.data) {
      notificationEasy({
        content: 'Тест успешно завершен',
      })

      setResultTest(res?.data)
    } else {
      notificationEasy({
        type: 'error',
        content: res?.error.data.detail ?? 'Произошла ошибка при завершении теста',
      })
    }
  }

  return (
    resultTest ? <ResultTest data={resultTest} /> : <TestView test={test} isLoadingTest={isLoadingTest} onSubmit={onSubmit} />
  )
}


