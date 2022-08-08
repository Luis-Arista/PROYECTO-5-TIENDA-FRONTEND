import React from 'react'
import imagen from '../../assets/img/termo.jpeg'
import './HomeInfo.css'

const HomeInfo = () => {
  return (
    <section>
        <div className="contenedor_home_info">
            <div className="Home_imagen">
                <img src={imagen} alt="" />
            </div>
            <div className="home_info">
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, natus?</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum perspiciatis repellendus deleniti. Impedit, officiis. Suscipit distinctio, molestias quisquam error omnis cupiditate sit adipisci delectus. Autem aliquid maiores non placeat labore ratione dolores magni reiciendis mollitia facilis distinctio amet perferendis ut saepe sequi, quisquam officia voluptatum quas accusamus excepturi praesentium laboriosam ipsa sint. Doloremque sapiente laborum doloribus? Omnis repudiandae repellendus officia vel. Delectus, illo sunt quisquam cumque illum quasi nulla magnam soluta beatae laboriosam veniam tempore dolores! Eaque, ducimus repudiandae nobis ullam voluptate maxime officiis amet libero, architecto aperiam, quasi quod tempore harum laudantium laborum neque. Porro non quisquam aut reiciendis?</p>
            </div>
        </div>
    </section>
  )
}

export default HomeInfo