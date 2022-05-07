import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe('Submit feedcack', () => {
    
    // isso deveria submeter um formulario
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png:base64,ff8d7f9df8d77f9d7f9d7f9f'
        })).resolves.not.toThrow(); //espero que tenha sido resolvida essa função sem dar throw

        expect(createFeedbackSpy).toHaveBeenCalled();//espero que essa função tenha sido chamada
        expect(sendMailSpy).toHaveBeenCalled();//espero que essa função tenha sido chamada
    });

    it('should not be able to submit a feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png:base64,ff8d7f9df8d77f9d7f9d7f9f'
        })).rejects.toThrow(); //espero que tenha sido rejeitada essa função e dar throw
    });

    it('should not be able to submit a feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png:base64,ff8d7f9df8d77f9d7f9d7f9f'
        })).rejects.toThrow(); //espero que tenha sido rejeitada essa função e dar throw
    });

    it('should not be able to submit feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Ta tudo bugado',
            screenshot: 'teste.jpg'
        })).rejects.toThrow(); //espero que tenha sido rejeitada essa função e dar throw
    });
})