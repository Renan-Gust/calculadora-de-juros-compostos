const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export function getMonths(month: number){
    const index = month + 1;
    // const date = new Date();

    if(index > 12){
        // date.setFullYear(date.getFullYear() + (index - 1));
        return getMonths((index - 1) - 12);
    } else {
        return months[index - 1];
    }
}