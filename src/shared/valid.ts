// if it returns true, it won't pass
export function validSpecialChar(data: string): boolean {
    return /^\W+$/.test(data);
}



// if it return true, it will pass
export function validText(text: string): boolean {
    return /^[\sA-ZÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬĐÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ_-]+$/im.test(text);
}

export function validUsername(username: string): boolean {
    return /^\w{8,30}$/.test(username);
}

export function validPassword(password: string): boolean {
    return /^\w{8,30}$/.test(password);
}

export function validEmail(email: string): boolean {
    return /^([.\w]+)@(gmail.com|yahoo.com)$/.test(email);
}

export function validPhone(phone: string): boolean {
    return /^(0|84)(\d{9})$/.test(phone);
}