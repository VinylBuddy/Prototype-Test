import { createTodo } from '../src/todo';

describe('Todo-Geschäftslogik', () => {
    test('BL01: Äußere Leerzeichen entfernen', () => {
        const todo = createTodo('  Milch kaufen  ', 1);

        expect(todo).toEqual({
            id: 1,
            title: 'Milch kaufen',
        });
    });

    test('BL02: Leere Eingabe mit Validierungsfehler ablehnen', () => {
        expect(() => createTodo('   ', 1)).toThrow(
            'Bitte eine Aufgabe eingeben.',
        );
    });
});