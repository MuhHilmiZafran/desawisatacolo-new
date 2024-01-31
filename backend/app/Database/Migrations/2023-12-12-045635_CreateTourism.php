<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateTourism extends Migration
{
    public function up()
    {
        //
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 20,
                'unsigned' => true,
                'auto_increment' => true,
            ],
            'name' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
            'gambarUtama' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
            'gambarPanjang' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
            'gambarKecil' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
            'deskripsi1' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'deskripsi2' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'deskripsi3' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'category' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
            // 'created_at datetime default current_timestamp',
            // 'updated_at datetime default current_timestamp on update current_timestamp',
        ]);

        $this->forge->addKey('id', true);
        $this->forge->createTable('tourism');
    }

    public function down()
    {
        $this->forge->dropTable('tourism');
    }
}
