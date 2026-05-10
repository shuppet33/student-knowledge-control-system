import { Button, Flex } from 'antd'

export const TeacherQuestionList = ({ questions }) => {
    return (
        <Flex
            wrap
            gap={12}
            style={{
                padding: '20px',
            }}
            onClick={(event) => {
                event.stopPropagation()
            }}
        >
            {questions.map((question) => (
                <Button
                    key={question}
                    size="small"
                    style={{
                        width: 28,
                        height: 28,
                    }}
                >
                    {question}
                </Button>
            ))}
        </Flex>
    )
}
