import React, {useState} from 'react'
import axios from 'axios'

export default function Contact() {

	const [contact, setContact] = useState({
		name: 'Do Trong Nhan',
		email: 'nhan@gmail.com',
		tel: '0123456789',
		description: 'Contact demo'
	}) 

	const onChangeInput = (e) => {
		const {name, value} = e.target

		setContact({...contact, [name]:value})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const res = await axios.post('/user/contact', {...contact})

			alert(res.data.msg);
		} catch (error) {
			return alert(error.response.data.msg)
		}
	}

	document.title = 'Contact'

	return (
		<div className='contact-page'>
			<h2>Contact</h2>
			<div className="contact-row">
				<div className="col-6">
					<form className='contact-form' onSubmit={handleSubmit}>
						<div className="contact-row">
							<label htmlFor="name">Full name</label><br />
							<input type="text" name='name' id='name' required placeholder='Your name is...' value={contact.name} onChange={onChangeInput}/>
						</div>
						
						<div className="contact-row">
							<label htmlFor="email">Email</label><br />
							<input type="email" name='email' id='email' required placeholder='Your email is...' value={contact.email} onChange={onChangeInput}/>
						</div>
						
						<div className="contact-row">
							<label htmlFor="tel">Phone number</label><br />
							<input type="tel" name='tel' id='tel' required placeholder='Your telephone number is...' value={contact.tel} onChange={onChangeInput}/>
						</div>
						
						<div className="contact-row">
							<label htmlFor="description">Description</label><br />
							<textarea type="text" name='description' id='description' required placeholder='Describe your problem...' value={contact.description} onChange={onChangeInput} rows='7'/>
						</div>
						
						<button type="submit">Send</button>
					</form>
				</div>
				<div className="col-6">
					<div className="contact-info">
						<h2>Communications</h2>
						<div className="info-detail">
							<p>Address: 475A Điện Biên Phủ, Phường 25, Quận Bình Thạnh, Thành Phố Hồ Chí Minh</p>
													
							<p>Email: <a href='mailto:daucatmoi@gmail.com'>daucatmoi@gmail.com</a></p>
							
							<p>Phone Number: <a href='tel:(+84) 123456789'>(+84) 123456789</a></p>
							
							<p>Follow us: 
								<a className='social-link' href='www.facebook.com'><i className="fa-brands fa-facebook"></i></a>
								<a className='social-link' href='www.instagram.com'><i className="fa-brands fa-instagram-square"></i></a>
								<a className='social-link' href='www.youtube.com'><i className="fa-brands fa-youtube"></i></a>
							
							</p>
						</div>
					</div>
				</div>
			</div>
			
		</div>
	)
}
