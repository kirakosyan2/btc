import React from 'react'
import { UICard } from '@components/_shared/Card'
import { UITitle } from '@components/_shared/Title'
import { AnswersUser, Question } from '@src/redux/test/test'
import { UICheckBox } from '@components/_shared/CheckBox'
import { UIFlex } from '@components/_shared/Flex'

type Props = {
    data: Question;
    userAnswers: AnswersUser[]
    setUserAnswers: React.Dispatch<React.SetStateAction<AnswersUser[]>>
}
export const TestCard: React.FC<Props> = ({ data, userAnswers, setUserAnswers }) => {
    const onChangeAnswer = (id: number) => {
        return () => {
            const currUserAnswer = userAnswers.find((quiz) => quiz.question_id === data.id)
            if (currUserAnswer) {
                const updateAnswer: AnswersUser[] = userAnswers.map((item) => {
                    if (item.question_id === data.id) {
                        if (item.selected_answers.includes(id)) {
                            return { ...item, selected_answers: item.selected_answers.filter((answer) => answer !== id) }
                        }
                        return { ...item, selected_answers: [...item.selected_answers, id] }
                    } else return item
                })

                setUserAnswers(updateAnswer)
            } else {
                const newAnswer: AnswersUser = {
                    question_id: data.id,
                    selected_answers: [id],
                }
                setUserAnswers([...userAnswers, newAnswer])
            }
        }
    }

    return (
        <UICard>
            <UITitle level={3}>{data.text}</UITitle>

            <UIFlex vertical>
                {data?.answers?.map((item) => (
                    <UICheckBox onClick={onChangeAnswer(item.id)}>{item.text}</UICheckBox>
                ))}
            </UIFlex>
        </UICard>
    )
}


