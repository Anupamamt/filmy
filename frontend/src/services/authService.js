

export const logout = async () => {
    
    if(localStorage.getItem('refresh')){
       localStorage.clear()
    }
    return
}