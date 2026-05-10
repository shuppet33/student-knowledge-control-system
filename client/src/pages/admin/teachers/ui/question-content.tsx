import { Card, Flex, Input } from 'antd'

import { QuestionAnswerCard } from './question-answer-card'

const { TextArea } = Input

export const QuestionContent = ({ questionText, answers }) => {
    return (
        <Flex vertical gap={24}>
            <Card
                styles={{
                    body: {
                        padding: 12,
                    },
                }}
            >
                <TextArea
                    value={questionText}
                    readOnly
                    autoSize={false}
                    style={{
                        height: 180,
                        resize: 'none',
                    }}
                />
            </Card>

            <Flex wrap gap={20}>
                {answers.map((answer) => (
                    <QuestionAnswerCard key={answer.id} answer={answer} />
                ))}
            </Flex>
        </Flex>
    )
}
