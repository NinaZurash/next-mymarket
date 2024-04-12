import Image from "next/image"

const FOOTER_INFO = {
    ნავიგაცია: ['განცხადების დამატება', 'იყიდე ონლაინ','მეორადი ნივთები','ფიშინსიგან თავდაცვა','მაღაზიები','გახსენი მაღაზია','Trade in'],
    დახმარება: ['ხშირად დასმული კითხვები','მესიჯის მიწერა','(032) 280 00 35','info@mymarket.ge'],
    კატეგორიები: ['მომსახურება','გაქირავება','სახლი და ბაღი','საოჯახო ტექნიკა','ტექნიკა','ნადირობა და თევზაობა','მუსიკა','საბავშვო']
}

export default function Footer() {
  return (
    <div className="border-t border-t-slate-200 flex justify-between px-52 py-20">
        {
            Object.entries(FOOTER_INFO).map(([key,data]) => (
                <div key={key} className="flex gap-5 flex-col">
                    <span className="font-semibold flex">{key}</span>
                    <ul className="flex flex-col gap-5">
                        {
                            data.map((item) => (
                                <li className="text-[#b5b5b5] font-sans text-sm hover:text-gray-700 hover:cursor-pointer" key={item}>{item}</li>
                            ))
                            
                        }
                        {key==='დახმარება' ? <div className="flex gap-4">
                        <svg className="hover:bg-slate-400 bg-slate-100 rounded-full p-2 w-8 h-8 transition-all duration-300 ease-in-out hover:cursor-pointer " xmlns="http://www.w3.org/2000/svg" width="8" height="18" viewBox="0 0 8 18" fill="none"><g clip-path="url(#clip0_6196_17198)"><path d="M5.32 17.3257V8.82568H7.686L8 5.89568H5.32V4.42968C5.32 3.66568 5.393 3.25668 6.5 3.25668H7.98V0.325684H5.616C2.773 0.325684 1.772 1.74668 1.772 4.13668V5.89568H0V8.82568H1.772V17.3257H5.32Z" fill="#26262A"></path></g><defs><clipPath id="clip0_6196_17198"><rect width="8" height="17" fill="white" transform="translate(0 0.5)"></rect></clipPath></defs></svg>
                        <svg className="hover:bg-slate-400 bg-slate-100 rounded-full p-2 w-8 h-8 transition-all duration-300 ease-in-out hover:cursor-pointer " xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none"><g clip-path="url(#clip0_6196_17201)"><path d="M9.33398 17.8257C6.89198 17.8257 6.57398 17.8157 5.62298 17.7717C4.87504 17.7561 4.13505 17.6148 3.43398 17.3537C2.83332 17.128 2.28928 16.7738 1.83998 16.3157C1.38366 15.8652 1.03113 15.3205 0.806984 14.7197C0.546086 14.0203 0.404451 13.282 0.387984 12.5357C0.343984 11.5847 0.333984 11.2677 0.333984 8.82568C0.333984 6.39968 0.343984 6.07968 0.387984 5.11468C0.402732 4.36665 0.544064 3.62652 0.805984 2.92568C1.03319 2.32704 1.38769 1.78488 1.84498 1.33668C2.29428 0.878597 2.83832 0.52432 3.43898 0.298684C4.13855 0.0370687 4.87726 -0.104588 5.62398 -0.120316C6.57498 -0.164316 6.89198 -0.174316 9.33398 -0.174316C11.776 -0.174316 12.093 -0.164316 13.044 -0.120316C13.7909 -0.104412 14.5299 0.0368887 15.23 0.297684C15.8303 0.523449 16.374 0.877719 16.823 1.33568C17.28 1.78427 17.6342 2.32677 17.861 2.92568C18.1204 3.62547 18.2617 4.36354 18.279 5.10968C18.323 6.07568 18.334 6.39568 18.334 8.82568C18.334 11.2557 18.324 11.5747 18.28 12.5367C18.2627 13.2828 18.1215 14.0209 17.862 14.7207C17.6308 15.318 17.2778 15.8606 16.8253 16.314C16.3728 16.7673 15.8309 17.1214 15.234 17.3537C14.5338 17.6143 13.7949 17.7556 13.048 17.7717C12.093 17.8157 11.775 17.8257 9.33398 17.8257ZM8.52798 1.44468C6.83698 1.44468 6.52798 1.45768 5.69898 1.49568C5.12822 1.50219 4.56288 1.60741 4.02798 1.80668C3.63704 1.95088 3.28338 2.18085 2.99298 2.47968C2.69415 2.77008 2.46418 3.12374 2.31998 3.51468C2.12144 4.04974 2.01657 4.61501 2.00998 5.18568C1.96598 6.11668 1.95698 6.39868 1.95698 8.82568C1.95698 11.2527 1.96598 11.5317 2.00898 12.4627C2.01557 13.0334 2.12044 13.5986 2.31898 14.1337C2.46325 14.5246 2.6932 14.8782 2.99198 15.1687C3.28238 15.4675 3.63604 15.6975 4.02698 15.8417C4.56221 16.0396 5.12738 16.1445 5.69798 16.1517C6.67498 16.1947 6.96398 16.2047 9.33498 16.2047C11.706 16.2047 11.994 16.1957 12.972 16.1517C13.5427 16.1451 14.1079 16.0402 14.643 15.8417C15.0316 15.6908 15.3843 15.4602 15.6784 15.1646C15.9724 14.869 16.2012 14.5151 16.35 14.1257C16.548 13.5905 16.6529 13.0253 16.66 12.4547C16.703 11.4777 16.713 11.1887 16.713 8.81968C16.713 6.45068 16.704 6.16068 16.66 5.18468C16.6534 4.61401 16.5485 4.04874 16.35 3.51368C16.2055 3.12291 15.9755 2.76931 15.677 2.47868C15.3868 2.17964 15.033 1.94964 14.642 1.80568C14.1069 1.60714 13.5417 1.50227 12.971 1.49568C12.04 1.45268 11.758 1.44368 9.33398 1.44368H8.52798V1.44468ZM9.33498 13.4447C8.42095 13.4447 7.52745 13.1736 6.76749 12.6658C6.00752 12.1579 5.41524 11.4361 5.06555 10.5916C4.71585 9.74711 4.62446 8.81788 4.80292 7.92144C4.98139 7.02499 5.42169 6.20161 6.06815 5.55544C6.71461 4.90926 7.53818 4.46931 8.4347 4.29123C9.33122 4.11315 10.2604 4.20495 11.1048 4.55501C11.9491 4.90507 12.6707 5.49767 13.1782 6.25785C13.6857 7.01803 13.9564 7.91165 13.956 8.82568C13.9544 10.0509 13.4669 11.2255 12.6004 12.0918C11.7339 12.9581 10.5592 13.4454 9.33398 13.4467L9.33498 13.4447ZM9.33398 5.82568C8.74064 5.82568 8.16062 6.00163 7.66727 6.33127C7.17393 6.66092 6.78941 7.12946 6.56235 7.67763C6.33528 8.22581 6.27587 8.82901 6.39163 9.41095C6.50738 9.9929 6.79311 10.5274 7.21266 10.947C7.63222 11.3666 8.16677 11.6523 8.74871 11.768C9.33066 11.8838 9.93386 11.8244 10.482 11.5973C11.0302 11.3703 11.4987 10.9857 11.8284 10.4924C12.158 9.99905 12.334 9.41903 12.334 8.82568C12.334 8.03003 12.0179 7.26697 11.4553 6.70436C10.8927 6.14175 10.1296 5.82568 9.33398 5.82568ZM14.134 5.10068C13.9204 5.10068 13.7116 5.03734 13.534 4.91867C13.3564 4.8 13.2179 4.63133 13.1362 4.43398C13.0545 4.23664 13.0331 4.01949 13.0747 3.80999C13.1164 3.60049 13.2193 3.40805 13.3703 3.25701C13.5213 3.10597 13.7138 3.00311 13.9233 2.96144C14.1328 2.91976 14.3499 2.94115 14.5473 3.02289C14.7446 3.10464 14.9133 3.24306 15.032 3.42067C15.1506 3.59827 15.214 3.80708 15.214 4.02068C15.214 4.30721 15.1002 4.58201 14.8977 4.78471C14.6952 4.98741 14.4205 5.10142 14.134 5.10168V5.10068Z" fill="#26262A"></path></g><defs><clipPath id="clip0_6196_17201"><rect width="18" height="18" fill="white" transform="translate(0.333984)"></rect></clipPath></defs></svg>
                        <svg className="hover:bg-slate-400 bg-slate-100 rounded-full p-2 w-8 h-8 transition-all duration-300 ease-in-out hover:cursor-pointer " xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none"><g clip-path="url(#clip0_6196_17204)"><path d="M9.62602 15.326H6.19702C6.19702 15.244 6.24202 6.14996 6.19702 5.20596H9.62602V6.63796C9.89456 6.2082 10.2461 5.83629 10.66 5.54396C11.2716 5.1472 11.9894 4.94595 12.718 4.96696C13.2397 4.94564 13.7602 5.03354 14.246 5.22502C14.7317 5.41651 15.1722 5.70737 15.539 6.07896C16.3451 7.03966 16.7489 8.27462 16.666 9.52596V15.326H13.237V9.91096C13.237 8.86696 12.937 7.62296 11.499 7.62296C11.0848 7.61571 10.6811 7.75289 10.357 8.01096C10.0838 8.23522 9.87154 8.52484 9.74002 8.85296C9.65054 9.11662 9.61219 9.39493 9.62702 9.67296V15.326H9.62602ZM4.29802 15.326H0.866016V5.20496H4.29602V15.326H4.29802ZM2.58402 3.82596H2.56602C2.32429 3.84421 2.08139 3.81253 1.85244 3.73288C1.62348 3.65324 1.41336 3.52733 1.23515 3.363C1.05694 3.19867 0.914442 2.99943 0.81653 2.77767C0.718619 2.5559 0.667386 2.31637 0.666016 2.07396C0.668083 1.8284 0.721198 1.58595 0.821985 1.36202C0.922772 1.13808 1.06903 0.937554 1.25147 0.773172C1.4339 0.60879 1.64853 0.484146 1.88172 0.407157C2.11491 0.330168 2.36157 0.302517 2.60602 0.325959C2.84888 0.304973 3.09345 0.334493 3.32435 0.41266C3.55524 0.490827 3.76745 0.615948 3.94762 0.780147C4.12779 0.944346 4.27201 1.14407 4.37121 1.36674C4.47041 1.5894 4.52244 1.8302 4.52402 2.07396C4.52709 2.30545 4.4823 2.53508 4.39248 2.74846C4.30265 2.96184 4.16972 3.15436 4.00202 3.31396C3.61297 3.66095 3.105 3.84437 2.58402 3.82596Z" fill="#26262A"></path></g><defs><clipPath id="clip0_6196_17204"><rect width="16" height="15" fill="white" transform="translate(0.666016 0.5)"></rect></clipPath></defs></svg>
                        </div> : null}
                    </ul>
                </div>
            ))
        }
    </div>
  )
}

