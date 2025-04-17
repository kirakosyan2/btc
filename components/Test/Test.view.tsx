import React, { useMemo, useState } from 'react'
import { TestCard } from './components/TestCard'
import { UIFlex } from '@components/_shared/Flex'
import { AnswersUser, TestList } from '@src/redux/test/test'
import { UIButton } from '@components/_shared/Button'

type Props = {
    test?: TestList;
    isLoadingTest: boolean
    onSubmit: (data: AnswersUser[]) => void
}
export const TestView: React.FC<Props> = ({ test, isLoadingTest, onSubmit }) => {
    const [userAnswers, setUserAnswers] = useState<AnswersUser[]>([])

    const isFullAnswers = useMemo(() => test?.questions.length === userAnswers.filter((item) => item.selected_answers.length).length, [test?.questions, userAnswers])

    const handleSubmit = () => {
        onSubmit(userAnswers)
    }

    return (
        <UIFlex vertical gap={40}>
            {test && test.questions.map((item) => (
                <TestCard data={item} userAnswers={userAnswers} setUserAnswers={setUserAnswers} />
            ))}

            <UIFlex justify='center'>
                <UIButton size='large' type='primary' style={{ width: 200 }} onClick={handleSubmit} disabled={isLoadingTest || !isFullAnswers} loading={isLoadingTest}>Отправить</UIButton>
            </UIFlex>
        </UIFlex>
    )
}