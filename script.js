document.addEventListener('DOMContentLoaded', function(){
    const btn_buka = document.getElementById('btnBuka');
    const overlay = document.getElementById('overlay');

    if (btn_buka && overlay) {

        btn_buka.addEventListener('click', function(){
            overlay.style.display = "flex";
        })

        window.addEventListener('click', function(event){
            if (event.target === overlay) {
                overlay.style.display = "none"
            }
        })
    }
})