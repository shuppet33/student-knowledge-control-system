import { Card } from 'antd'

export const QuestionAnswerCard = ({ answer }) => {
    return (
        <Card
            style={{
                width: 'calc(50% - 10px)',
                border: answer.isCorrect ? '1px solid #52c41a' : undefined,
            }}
            styles={{
                body: {
                    padding: '16px 20px',
                },
            }}
        >
            <div
                style={{
                    fontSize: 18,
                    fontWeight: 600,
                    maxHeight: 120,
                    overflowY: 'auto',
                }}
            >
                {answer.id}. {answer.text}
            </div>
        </Card>
    )
}
