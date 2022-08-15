import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';



export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  forSubmitHandler = data => {
    const { name, number } = data;
    const { contacts } = this.state;
    contacts.some(contact => contact.name === name)
      ? alert(`${name} is alredy added to the contacts`)
      : this.setState(prevState => ({
        contacts: [
          ...prevState.contacts,
          {
            id: nanoid(),
            name: name,
            number: number
          },
        ],
      }));
  };

  handleChange = evt => {
    this.setState({ filter: evt.target.value });
  };

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  componentDidUpdate(prevState) {
    this.state.contacts !== prevState.contacts &&
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    contacts && this.setState({ contacts: contacts });
  }

  render() {
    const { contacts, filter } = this.state;
    const { handleChange, handleDelete, forSubmitHandler } = this;
    const filteredContacts = [];
    contacts.forEach(contact => {
      contact.name.toLowerCase().includes(filter.toLowerCase()) &&
        filteredContacts.push(contact);
    });


    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm forSubmitHandler={forSubmitHandler} />
        
        <h2>Contacts</h2>
        <Filter filter={filter} handleChange={handleChange} />
        {filteredContacts && (
          <ContactList
            contacts={filteredContacts}
            handleDelete={handleDelete}
          />
        )}
      </div>
    );
  }
}


