import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { fetchRepos, fetchStars } from '../../service/api'
import ReposList from '../github/ReposList'

class ReposContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            repos: [],
            username: '',
            statusCode: 200,
            message: 'Ok'
        }

        this.changeHandler = this.changeHandler.bind(this)
        this.searchRepos = this.searchRepos.bind(this)
        this.searchStars = this.searchStars.bind(this)
    }

    changeHandler(ev) {
        this.setState({ username: ev.target.value })

        if (!this.state.username.length) {
            this.setState({ repos: [], statusCode: 200, message: 'Ok' })
        }
    }

    search(repos) {
        this.setState({ isLoading: true })
        let promise
        if (repos) {
            promise = fetchRepos(this.state.username)
        } else {
            promise = fetchStars(this.state.username)
        }
        promise.then(res =>
            this.setState({
                repos: res.data,
                isLoading: false,
                statusCode: res.status,
                message: res.statusText
            })).catch((error) => {
                if (error.response) {
                    this.setState({
                        isLoading: false,
                        statusCode: error.response.status,
                        message: error.response.statusText
                    })
                }
            })
    }

    searchRepos() {
        this.search(true)
    }

    searchStars() {
        this.search(false)
    }

    render() {
        return (
            <div className="col-xs-12 col-sm-9 col-md-10">
                <h1>Repos</h1>
                <form action="#">
                    <div className="form-group">
                        <label htmlFor="name">Digite o nome do usuário</label>
                        <input
                            className="form-control"
                            id="name"
                            onChange={this.changeHandler}
                            type="text"
                        />
                    </div>
                    <div className="btn-group">
                        <button type="button"
                            disabled={!this.state.username.length}
                            className="btn btn-info"
                            onClick={this.searchRepos}>Repos
                        </button>
                        <button type="button"
                            disabled={!this.state.username.length}
                            className="btn btn-info"
                            onClick={this.searchStars}>Starreds
                        </button>
                    </div>
                </form>
                <section className="mt-3">
                    {
                        this.state.username && !this.state.isLoading && this.state.statusCode !== 200 &&
                        <div className="alert alert-warning" role="alert">
                            {this.state.statusCode} - {this.state.message}
                        </div>
                    }
                    {
                        this.state.isLoading &&
                        <div className="alert alert-info" role="alert">
                            <span>Aguarde, carregando...</span>
                        </div>
                    }
                    {
                        this.state.username && !this.state.isLoading &&
                        < ReposList repos={this.state.repos}></ReposList>
                    }
                </section>
            </div >
        )
    }
}

export default ReposContainer