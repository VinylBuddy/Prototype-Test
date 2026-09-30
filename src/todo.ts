export type Todo = {
    id: number;
    title: string;
};

export function createTodo(input: string, id: number): Todo {
    const title = input.trim();

    if (title.length === 0) {
        throw new Error('Bitte eine Aufgabe eingeben.');
    }

    return {
        id,
        title,
    };
}