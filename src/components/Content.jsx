import { Crown, X } from 'lucide-react';
import React, { Component } from 'react';

class GiveawayPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      winner: null,
      newParticipant: '',
      error: ''
    };
  }

  handleAddParticipant = (participant) => {
    const { newParticipant, participants } = this.state;
    if (newParticipant.trim() === '') {
      this.setState({ error: 'Nama peserta tidak boleh kosong.' });
      return; // Tidak menambahkan peserta jika input kosong
    }

    // Menambahkan peserta ke daftar
    this.setState((prevState) => ({
      participants: [...prevState.participants, newParticipant],
      newParticipant: '', // Mengosongkan input setelah menambahkan
      error: '', // Menghilangkan pesan kesalahan jika ada
    }));
  };

  handleRemoveParticipant = (index) => {
    this.setState((prevState) => {
      const newParticipants = [...prevState.participants];
      newParticipants.splice(index, 1); // Hapus peserta berdasarkan indeks
      return { participants: newParticipants };
    });
  };

  handlePickWinner = () => {
    const { participants } = this.state;
    const randomIndex = Math.floor(Math.random() * participants.length);
    const winner = participants[randomIndex];
    this.setState({ winner });
  };

  render() {
    const { participants, winner } = this.state;

    return (
      <>
        <div className='flex flex-col items-center'>
          <section className='text-center leading-loose'>
            <p className='text-4xl font-bold'>Simple Giveaway Picker</p>
            <p>Made with ❤ by Eskey.</p>
          </section>
          <section className='pt-5'>
            <button className="btn btn-sm btn-accent" onClick={this.handlePickWinner}>Pick a winner</button>
          </section>
          <section className='pt-[40px] flex flex-col items-center'>
            <Crown color="#ffdd00" size={30} className='mb-2'/>
            <div className='bg-base-200 px-[60px] py-[20px] rounded-xl'>
              {winner && <p className='text-xl text-[#ffdd00]'>{winner}</p>}
            </div>
          </section>
          <section className='pt-[10px] flex flex-col items-center'>
            <section>
              <p className='text-xl font-bold tracking-wider'>Participants</p>
            </section>
            <section>
              <div className="overflow-x-auto">
                <table className="table table-lg w-full">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map((participant, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{participant}</td>
                        <td>
                          <button className="btn btn-sm btn-circle btn-outline btn-error" onClick={() => this.handleRemoveParticipant(index)}>
                            <X size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <section>
              <input type="text" placeholder="Type here" className="input input-bordered w-full text-center" value={this.state.newParticipant} onChange={(e) => this.setState({ newParticipant: e.target.value })} required />
              <section className='pt-2'>
                <button className="btn btn-wide" onClick={this.handleAddParticipant}>Add</button>
              </section>
            </section>
          </section>
        </div>
      </>
    );
  }
}

export default GiveawayPicker;
